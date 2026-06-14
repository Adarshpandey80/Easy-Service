# Session and Cookie-Based Authentication Guide

## Overview
This application has been migrated from localStorage-based JWT token authentication to a more secure session and cookie-based authentication system using express-session and MongoDB.

## Key Benefits
1. **Security**: Tokens are no longer exposed in localStorage (vulnerable to XSS attacks)
2. **HttpOnly Cookies**: Session IDs stored in secure, httpOnly cookies
3. **Server-Side Sessions**: All session data stored on server, reducing client-side exposure
4. **CSRF Protection Ready**: Can easily add CSRF protection in future
5. **Session Expiry**: Automatic session expiration with configurable timeout

## Architecture

### Server-Side (Node.js/Express)

#### 1. Session Configuration (`app.js`)
```javascript
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: process.env.MONGODB_URI,
    touchAfter: 24 * 3600 // Lazy session update
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true,  // Prevent JS access
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  }
}));
```

#### 2. Login Controllers
Updated login endpoints now store user info in sessions instead of generating JWT:

**User Login** (`src/controllars/userController.js`):
```javascript
req.session.userId = user._id;
req.session.email = user.email;
req.session.role = user.role;
req.session.userType = 'user';
```

**ShopOwner Login** (`src/controllars/shopOwnerController.js`):
```javascript
req.session.shopOwnerId = shopOwner._id;
req.session.email = shopOwner.email;
req.session.userType = 'shopowner';
```

#### 3. Logout Endpoints
```javascript
const userLogout = (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie('connect.sid');
    res.json({ message: "Logout successful" });
  });
};
```

#### 4. Authentication Middleware (`src/middleweres/authMiddleware.js`)
```javascript
const verifyUserSession = (req, res, next) => {
  if (req.session?.userId && req.session?.userType === 'user') {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const verifyShopOwnerSession = (req, res, next) => {
  if (req.session?.shopOwnerId && req.session?.userType === 'shopowner') {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
```

### Client-Side (React)

#### 1. Auth Service (`src/services/authService.js`)
Provides centralized API client with automatic cookie handling:
```javascript
export const authApiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Automatically sends cookies
  headers: {
    'Content-Type': 'application/json'
  }
});
```

All API calls use `withCredentials: true` to automatically send session cookies.

#### 2. Auth Context (`src/context/AuthContext.jsx`)
Global auth state management:
- Stores: `user`, `isLoggedIn`, `userType`, `loading`
- Methods: `loginUser()`, `logoutUser()`, `loginShopOwner()`, `logoutShopOwner()`

#### 3. Usage in Components
```javascript
import { useAuth } from '../context/AuthContext.jsx';

function MyComponent() {
  const { user, isLoggedIn, userType, logout } = useAuth();
  
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  
  return (
    <div>
      Welcome {user.username}!
    </div>
  );
}
```

## Migration Changes

### What Was Removed
- ❌ localStorage usage for storing tokens
- ❌ JWT token decoding in components
- ❌ Manual Authorization headers with Bearer tokens
- ❌ jwtDecode library usage

### What Was Added
- ✅ express-session middleware
- ✅ connect-mongo for persistent session storage
- ✅ AuthContext for state management
- ✅ authService with automatic cookie handling
- ✅ Session authentication middleware
- ✅ Secure httpOnly cookies

### Files Modified

#### Server
- `app.js` - Added session middleware
- `src/controllars/userController.js` - Updated login/logout
- `src/controllars/shopOwnerController.js` - Updated login/logout
- `src/routes/userRoutes.js` - Added logout route
- `src/routes/shopOwnerRoutes.js` - Added logout route
- `src/middleweres/authMiddleware.js` - New auth verification middleware

#### Client
- `src/App.jsx` - Added AuthProvider wrapper
- `src/context/AuthContext.jsx` - New auth context
- `src/services/authService.js` - New auth service
- `src/Component/UserLoginForm.jsx` - Updated to use AuthContext
- `src/Component/Nav.jsx` - Updated to use AuthContext
- `src/Component/Chat.jsx` - Updated to use AuthContext
- `src/Shopkeeper/ShopOwnerloginForm.jsx` - Updated to use AuthContext
- `src/Shopkeeper/ShopkeeperNavbar.jsx` - Updated to use AuthContext
- `src/Shopkeeper/ShopOwnerDashboard.jsx` - Updated to use AuthContext
- `src/Shopkeeper/Messages.jsx` - Updated to use AuthContext
- `src/Shopkeeper/ShopOwnerServices.jsx` - Updated to use AuthContext
- `src/Shopkeeper/Kyc.jsx` - Updated to use sessions
- `src/Shopkeeper/ShopkeeperChat.jsx` - Updated to use AuthContext
- `src/Authorization/ShopkeeperAuth.jsx` - Updated to use AuthContext
- `src/Shopkeeper/ShopOwnerWorkers/*.jsx` - Updated all worker components

## Environment Variables

### Server (.env)
```
SESSION_SECRET=your-secret-key-here
MONGODB_URI=mongodb://your-connection-string
NODE_ENV=production  # or development
```

### Client (.env)
```
VITE_API_URL=http://localhost:8000
```

## API Endpoints

### User Authentication
- `POST /user/signup` - User registration
- `POST /user/login` - User login (sets session cookie)
- `POST /user/logout` - User logout (destroys session)

### ShopOwner Authentication
- `POST /shopowner/register` - ShopOwner registration
- `POST /shopowner/login` - ShopOwner login (sets session cookie)
- `POST /shopowner/logout` - ShopOwner logout (destroys session)

## Session Flow

### Login Flow
1. User submits credentials
2. Server validates credentials
3. If valid, server creates session in MongoDB
4. Server sets httpOnly cookie with session ID
5. Client receives user data and stores in React Context
6. Browser automatically sends cookie with future requests

### API Request Flow
1. Component makes request via authApiClient
2. Axios automatically includes cookie (withCredentials: true)
3. Server validates session from cookie
4. If valid, processes request; if invalid, returns 401
5. Client handles 401 by redirecting to login

### Logout Flow
1. User clicks logout
2. Client calls logout endpoint
3. Server destroys session in MongoDB
4. Server clears session cookie
5. Client clears React Context
6. Browser stops sending session cookie

## Protected Routes

To protect routes with session authentication, use the middleware:

```javascript
router.get('/protected-route', verifyUserSession, controllerFunction);
router.get('/shop-route', verifyShopOwnerSession, controllerFunction);
```

## Best Practices

1. **Always use withCredentials**: When making API calls, use `withCredentials: true`
2. **Use AuthContext**: Don't check session status directly, use the useAuth hook
3. **Check isLoggedIn**: Always check isLoggedIn before accessing user data
4. **Handle 401 Errors**: Implement global 401 error handling to redirect to login
5. **Environment Variables**: Keep SESSION_SECRET secure and never commit to repo

## Troubleshooting

### Cookies Not Being Sent
- Ensure `withCredentials: true` is set on all axios calls
- Check that frontend and backend URLs match CORS settings
- Verify cookie domain settings in browser DevTools

### Session Not Persisting
- Ensure MongoDB connection is working
- Check SESSION_SECRET environment variable is set
- Verify MongoStore configuration in app.js

### 401 Unauthorized Errors
- Ensure user is logged in (check context state)
- Verify session exists in MongoDB
- Check that cookies are being sent with requests
- Clear browser cookies and login again

## Security Notes

✅ **Secure by default**:
- HttpOnly flag prevents XSS attacks
- Secure flag requires HTTPS in production
- SameSite=Lax prevents CSRF attacks
- Session data stored on server only

⚠️ **Still remember**:
- Always use HTTPS in production
- Rotate SESSION_SECRET periodically
- Implement rate limiting on login endpoint
- Add CSRF token for state-changing operations
