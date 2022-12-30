There are a few different approaches you can take to prevent access to blob URLs or image URLs in a browser:

1.  Use a server-side script to handle image requests: Instead of directly linking to an image URL, you can use a server-side script (e.g. PHP, Python, Ruby) to check whether the user is authorized to access the image. If they are not, the script can return an error message or a placeholder image instead of the actual image data.
2.  Use a client-side script to handle image requests: You can use a client-side script (e.g. JavaScript) to check whether the user is authorized to access the image. If they are not, the script can prevent the image from being displayed by replacing it with a placeholder image or by hiding it completely.
3.  Use a proxy server to handle image requests: You can set up a proxy server to handle image requests and perform authorization checks before returning the actual image data. This can be done with any server-side language (e.g. PHP, Python, Ruby).
4.  Use access controls on your web server: If you have access to the server where the images are hosted, you can use access controls (e.g. .htaccess files for Apache servers) to limit access to specific IP addresses or user groups.

It's also important to note that even if you take steps to prevent direct access to blob URLs or image URLs, it may still be possible for someone to download the images by using other means (e.g. by using a screen capture tool). To fully protect the images, you will need to implement additional security measures, such as encrypting the images or using watermarks.
