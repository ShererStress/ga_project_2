throughout# ga_project_2
Code storage, recursion tester, and walking security flaw
Accessed at:
https://code-storage-attempt-1.herokuapp.com

A basic CRUD program that allows users to store functions and test recursive functions.

//General Approach
The core of the program is a fairly basic implementation of a CRUD app - users can add, edit, view, and delete functions. Each function has a title, the name of a function, a list of parameters, and the function code itself. The functions are stored in a database. Nothing fancy here.

The recursion tester is the more complex (and less secure?) part of the program. It takes a user-made function (along with user-assigned arguments), evaluates it as javascript(!), executes the function, and displays the parameters and return value of each function call. Ideally, this provides some insight into where a recursive function deviates from what it 'should do'. No results from this process are stored.

Unsurprisingly, the act of evaluating user-added strings as javascript is pretty dangerous, since it WILL execute the input as code. There are ways of mitigating this risk, some of which I attempted to follow with varying success. At this point, the best safeguard I was able to implement was to complete any evaluation inside of an iFrame with the 'sandbox' attribute - this prevents the code inside the iFrame from accessing just about anything outside the iFrame itself (cookies, the DOM, etc.). That said, I know it isn't a bulletproof solution for a number of reasons.  The myriad forms strewn throughout the program don't have safeguards, none of the user input is sanitized, and the evaluated code isn't abstracted far enough from the rest of the program as I would like.

//Technologies/Advice used
js, html, css
"dotenv": "^8.0.0",
"ejs": "^2.6.1",
"express": "^4.16.4",
"method-override": "^3.0.0",
"mongoose": "^5.5.5"

Insights into how to secure this thing:
https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/#disqus_thread
https://www.htmlgoodies.com/html5/client/how-to-safeguard-your-site-with-html5-sandbox.html
https://blog.codepen.io/2014/06/05/014-security
https://blog.codepen.io/2015/07/07/045-javascript-security/

//Unsolved problems

The forms are unsecured - a user could easily escape the HTML and run whatever they wished. Likewise, the database is unprotected, and little-bobby-drop-tables could easily happen.

The user's input is un-sanitized.

Adding in a subdomain to evaluate and run the user's code would be ideal for giving an additional level of security.

Cross-site-scripting is an inherent threat with this kind of program (user input and a shared database). The fact that this input is eval()'ed amplifies this risk. Little has been done to mitigate this.
