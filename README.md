# calculator

This is the final project in Foundations TOP (https://www.theodinproject.com/paths/foundations/courses/foundations). I went a little beyond the normal scope of what was required by creating a calculator that could use brackets. I wanted a challenge - and I got it. Brackets increased the difficulty and time to complete by probably a factor of 10. If you're checking out my project as an example and debating how to approach your own project be warned!

'Completing' this is a little like completing an art project where you kind of just have to pick a brush stroke and call it done. The bare minimum of course being a working calculator! If I were to add anything it would be some fun stuff in CSS, like tilting based on mouse x,y or some glossy.shimmery display. At this point I'm dying to get started learning React/Ruby? hmm...

How does it actually work though?
Run it and press the information button (i) (https://julescarson.github.io/calculator).

The basic premise is that every bit of the equation within a pair of brackets is treated as its own independent equation, solved, and then re-embedded in the larger equation. The pairs, called stacks, have a hierarchy that determines order. Each time a stack is solved, the new equation gets passed to the parser until no stacks remain and final answer is displayed.

The user inputs the equation as a string which is then split into an array of items based on whether the string character is a symbol or a number. Error checking happens throughout, mainly as an array. Although it may be useful to look further into regex for a problem like this. I wouldn't be surprised if I missed an edge case or two (please message me if you find one).

The stack system itself was pretty challenging to come up with. Apparently there are all kinds of algorithms around this type of problem that I wasn't familiar with before starting. If I were to re-write this now I think it would look like a very different project, but I'm super happy with how it turned out and what I learned.
