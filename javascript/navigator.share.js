// To use the navigator.share() method on a button click, you can do something like this:

document.getElementById('share-button').addEventListener('click', function() {
  navigator.share({
    title: 'My Page',
    text: 'Check out this page I found!',
    url: window.location.href
  })
  .then(() => console.log('Successful share'))
  .catch(error => console.log('Error sharing:', error));
});

/*
This will attach a click event listener to the element with an ID of share-button, and when the button is clicked, it will invoke the navigator.share() method with the specified title, text, and URL. If the user's browser supports the navigator.share() method and the user successfully shares the content, the then() function will be called. If there is an error, the catch() function will be called with the error as an argument.

You may also want to include some feature detection to check whether the navigator.share() method is supported before trying to use it, in case the user is using a browser that doesn't support it. Here's an example of how you could do this:
____________________________________________________________
*/ 

if (navigator.share) {
  document.getElementById('share-button').addEventListener('click', function() {
    navigator.share({
      title: 'My Page',
      text: 'Check out this page I found!',
      url: window.location.href
    })
    .then(() => console.log('Successful share'))
    .catch(error => console.log('Error sharing:', error));
  });
} else {
  // Fallback logic, such as displaying a message or adding a share button for a different sharing service
}
