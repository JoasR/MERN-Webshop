# MERN-Webshop
TODO: 
- Features:
  * Add the option for a user to add an item to its favourites.
  * Add so the user can see its favourite items under the favourites tab
  * Add so the user can view his orders after ordering something
  * Orders should be received from Stripe
  * Add option to receive news letters
  * Add Option for user to change password, or the ability to reset password when the user has forgotten his password via an e-mail reset password option

-Improvements:
  * Change password encryption from AES to SHA-256 with Salt
  * Add functionality to all buttons, not all buttons have their functionality yet e.g. one of the checkout buttons in the cart page. Should just get the implementation from the other checkout button
  * Add proper images, not only test images

-Bugs:
  * Change the way ID is displayed or remove it when the user is on mobile devices, since this breaks the responsive Layout
  * Checkout does sometimes give a 403 forbidden request
    - Only happens sometimes
