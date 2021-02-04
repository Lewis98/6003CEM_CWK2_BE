# 6003CEM_CWK2
Web API Coursework


##Scenario
You work for a company that specialises in providing small-scale full stack web applications to small and medium sized enterprises (SMEs) and charities. You have been approached by a national charity "The Canine Shelter" who wish to develop a web application for matching shelter dogs with new owners and arranging visits to shelter locations to meet the dogs. The charity has locations in several parts of the country, and there will be a staff member at each location who uses the app to input and manage details of the current dogs available at their physical site. The public should be able to browse the application and easily search and filter the dogs shown. Prospective owners should be able to create a user account in the application, create a list of favourites, and directly message the relevant shelter employee to ask for details of any particular dog they are interested in.

The charity does not have an internal IT department and they have contracted your company to provide a minimum viable product meeting the requirements listed above.

##Assessment Task
Following a brief feasibility study, your manager has tasked you with producing a Node JS RESTful API and React JS SPA prototype for the client, which should include appropriate API and code documentation and endpoint tests to ensure its future maintainability and robustness. They have also asked you to record a short demonstration video for the client to showcase the functionality available. In order of importance your manager has identified that the developed software project should have the following features. Details of the implementation are up to yourself, based on your expectation of user needs.

1. (Essential)
⋅⋅* Charity workers can register, log in, then add, remove and update details of the dogs available
at their centre. Hint: consider requiring a known 'sign up code' during registration to confirm
that the user is an employee.
⋅⋅* The public can browse, search and filter the current list of dogs to help them find a suitable pet.
⋅⋅* Authentication and authorisation prevent the API being used by non-registered users, except to
do safe GET requests on dog listings.
⋅⋅* All URI endpoints, HTTP verbs, and JSON data representations handled by the API are
documented using the OpenAPI Specification (OAS) standard, version ≥2.0.
⋅⋅* API endpoint functionality is thoroughly tested via a mock HTTP request library called by an
appropriate automated testing framework.
⋅⋅* Code and project documentation for both the front and back end components are provided.
⋅⋅* A video demonstrating the core functionality of the developed API/web application is provided.
2. (Important)
⋅⋅* The API allows charity workers to upload photos to be associated to each listing.
⋅⋅* Members of the public can sign up for a user account to let them create a list of 'favourites'.
⋅⋅* The public can use the app to send a direct message to the charity expressing interest in any
dog on the site. The charity can respond to the message through the app and can delete any
message sent or received.
3. (Useful)
⋅⋅* When a new dog listing is made 'live' the API automatically posts a tweet to the charity's
Twitter feed, with basic details of the new item.
⋅⋅* Members of the public can register their account using an external authentication service. For
example, their Google credentials can be used to log in via Google's OAuth2-based sign in
process.
4. (Nice to have)
⋅⋅* Since some shelter staff are not very good at identifying dog breeds, but a dog's breed is an
important property of its listing, the dog listing and editing interface offers a 'breed selection
helper'. This uses the famous 'Dogs as a Service' (DaaS) API to access dog images from the
Stanford University Dogs Dataset: https://dog.ceo/dog-api/.
⋅⋅* Any other useful features that you come up with yourself.
