Study-Nook
Study-Nook is a full-stack room booking platform where users can explore available study rooms, view room details, book rooms for specific time slots, manage their own listings, and track their bookings. The application includes secure authentication, protected booking actions, owner-based room management, and search functionality by room name.

Live Links


Project Purpose
The main purpose of Study-Nook is to provide a simple and organized platform for students or users to find and book suitable study rooms. Room owners can add, update, and delete their own room listings, while authenticated users can book available rooms and cancel their own bookings when needed.

Key Features

User authentication using Better Auth
Google login support
JWT based protected API access
Browse all available study rooms
View detailed information for each room
Search rooms by room name
Book a room by selecting date and time slot
Prevents booking conflicts for the same room and time slot
Users can view their own bookings
Users can cancel their own bookings
Room owners can add new rooms
Room owners can update room information
Room owners can delete only their own rooms
Latest rooms section on the homepage
Booking count updates after each successful booking
Responsive UI for mobile, tablet, and desktop
MongoDB database integration
REST API based backend


Technologies Used
Frontend
TechnologyPurposeNext.jsFrontend frameworkReact.jsUI libraryTailwind CSSStylingBetter AuthAuthenticationReact Hot ToastNotificationsNext NavigationClient-side routingVercelDeployment
Backend
TechnologyPurposeNode.jsRuntime environmentExpress.jsWeb frameworkMongoDBDatabaseMongoDB Node.js DriverDatabase connectionCORSCross-origin resource sharingdotenvEnvironment variable managementjose-cjsJWT verificationVercelDeployment

NPM Packages Used
Client Side
next
react
react-dom
better-auth
react-hot-toast
tailwindcss
postcss
autoprefixer
Server Side
express
cors
dotenv
mongodb
jose-cjs

Main Functionalities
Authentication
The project uses Better Auth for user authentication. Authenticated users receive a token which is used to access protected backend routes.
Protected actions include:

Add room
Book room
Cancel booking
Access user-specific data

Room Management
Room owners can add new study rooms with the following information:

Room name
Description
Image
Floor
Capacity
Hourly rate
Amenities
Owner information

Owners can also update and delete their own room listings.
Booking System
Authenticated users can book rooms by providing:

Booking date
Start time
End time
Special note

The backend validates the following before confirming a booking:

Required booking fields are present
Valid room ID is provided
Booking date is present or in the future
End time must be after start time
No conflicting time slot exists for the same room