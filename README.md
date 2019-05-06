# ga_project_2
Code storage (and hopefully algorithm tester)



//In progress notes

Security concerns: a user saves a malicious piece of code that is then run on another’s browser (willingly or not). I am not knowledgeable enough to parse a user’s input to mitigate all (or any, lol) malicious intent, so I need to avoid this scenario completely. This (sadly) means saving the code itself to the database is now forbidden.

The code input should only be ‘evaled’ on the client’s computer, and NEVER stored in the database. This will prevent User 1’s code form being run on User 2’s browser.

(show.ejs -> run.ejs(eval happens here) -> displayResults.ejs -> edit.ejs(save results))

When running code, run it on a separate domain (a secure subdomain), that is isolated from the original domain

Instead, what we can save, are results that are NEVER, EVER evaluated, only strictly printed in html strings/numbers.

This means the schema will save other things than the code:
A title of the code
(An image of the code?) -> this seems safe, since it cannot be evaluated. (MAYBE?)
Input data
Output data
Can the code be stored if it is never directly run? (The only time code is evaled is if the user types/copy+pastes it in?)
