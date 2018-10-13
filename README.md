# Current scoring system

In the current scoring system, we collect information on the kitties so far released into the game. Each kitty has different traits. So, in the collected aggregate data we can see which trait is more common than the other. For instance, we can see that more kitties have 'pouty' mouth than 'wasntme' mouth. And so the probability of getting a 'wasntme' mouth is lower. We calculate the probability of getting each trait for a kitty and rank them linearly. So, the trait with the lowest probability gets an `A++` and the one with the highest probability gets a `D`. And everything else is in between. To calculate the full score for a kitty, we take the average of all grades for each trait. However, because we have fancies as well as exclusives. We rank them as `A++` and `A+++` respectively. This grade matches with the score of traits.


## Contributing to the scoring

* There are plenty of ways to improve scoring. For instance, we don't take into account mewtations. The reason for this is because the concept of 'mewtation' is more closely tied to the cryptokitty platform and not the actual token that we use for scoring. However, it is not very hard to take mewtations into account. But how would we rate it?

* Another issue that linear grading is not ideal. In the analogy of a classroom, more kitties have bad grades, but there are a lot of kitties with good grades. Because our grades are linearly calculated, the kitties that perform well are not represented well enough. In other words, the ideal score would have such division `A`, `A+`, `A++`, `A+++`, `A++++`...

* There are a few UI bugs as well that require fixing.


## Deploying changes

We use React.js with Heroku to deploy our code.

Useful guide on iti [here](https://blog.heroku.com/deploying-react-with-zero-configuration).
