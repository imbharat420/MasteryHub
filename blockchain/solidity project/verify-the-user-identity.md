
Verification of User Identity

DESCRIPTION

A user is trying to access your application by entering his personal details. Develop a smart contract to verify the user’s identity before allowing him access to your application.  
  
**Actions to Perform:**

1.  Store the details of the user in the form of a hash in a smart contract
2.  Send a text message to the user while the system calls the Solidity function named add.User
3.  Create a function add. The user that passes two parameters, namely, address user and a hashed_verification, which is an array of 32 bytes and contains your hash of the code that has been sent to the user
4.  The function can be called only by the owner or the modifier
5.  Create a contract constructor that consists of a Boolean value to store the address
6.  Map the address with user_verified that lies in the add.User function
7.  Set constructor’s Boolean value to false
8.  The user_codes should be mapped with hashed_verification to an array of 32 bytes
9.  The user enters the code on your frontend
10.  The verify function should compare the hash of the verification code entered by the user with the hash that is sent by the add.User function
11.  Once the user is verified, the default Boolean value is changed from false to true
12.  The verification code is then stored in plain text on the Blockchain after the user is verified