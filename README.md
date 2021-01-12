# Nutrition App


## A note from Plaxico

I didn't get nearly as far as I would have hoped, as this is a fair bit of work,
but here's what I've accomplished thus far. (I've in earnest spent about 12 hours
developing this app as time has permitted while I've been wrapping up another project.)

What's missing:

  * Integration tests - This application lacks the thorough integration tests
  that I'd typically write in Testing Library; under normal circumstances, I
  write mostly integration tests (as opposed to an abundance of unit tests), as
  they yield more bang for the buck in terms of exercising feature code in a manner
  that is meaningful and confidence-inducing to both developers and stakeholders.
  Also, I take care to avoid implementation details in my test code like the
  plague. For all that, I'm pretty sure the UI isn't re-rendering on succesful
  API calls, along with various other issues, both behavioral- and layout-related.
  * Styling - I've made all but no effort to style this application, though, as
  with all of the above items, am confident that, given a bit more time, I
  could have it rendering to spec without glitches across multiple screen sizes.
  * TypeScript in the API - The UI code has TypeScript; the API does not.
  * Reset server data - I just ran out of time.

 I'm probably missing a thing or two else that I've missed; if you'd like for me
 to see this through to completion, I'd gladly take another day; none of the above
 would be particularly challenging--I'd just need a bit more time.

## How to run the app

  In order to run the app, `cd` into the `./server` and `./ui` directories
  respectively and run this set of commands once for each:

  `yarn preinstall; yarn install; yarn postinstall, yarn start'

  You should now have running instances of both the graphql API and the client
  application.

  

