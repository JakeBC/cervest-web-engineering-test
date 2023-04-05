# Web Engineering Technical Test

Submission for technical task by Jacob Cozens

## Notes on this solution and thoughts for improvements

### Data transformation

- This felt like a tricky problem to solve in an elegant way. My solution here feels a bit cumbersome. I would definitely revisit this given more time.
- One important thing which I hope to have covered is memoisation of values derived from potentially expensive operations such as this one.
- The amount of rainfall data here is trivial but if this data set is large in real world situations then a holistic approach for serving and consuming it could be beneficial i.e. a response schema that suits using the data for presentation in an html table (mapping over column headers, rows and cells).

### Loading state

- I have not included a nice loading state for the ui. Rainfall data is processed fairly quickly is there is not much of it in this example, however, the ux would be negatively effected when waiting times are increased.
- Use of suspense could be a nice way to overcome this as described [here](https://beta.nextjs.org/docs/routing/loading-ui).

### Error handling

- There is no error handling in this solution. Since the api serves static values this seemed unuecessary in order to satisfy the requirements.
- It would be prudent to account for possible errors though, catch them early and surface useful information to the user whilst maintaining a good ux.

### Tests

- The tests I have written here don't cover all edge cases or make meaningful assertions on all the important behaviour. Hopefully they do provide a good indication on the approach I would take given more time.
- Tests could be made more granular and cover a wider range of edge cases and unhappy paths.

### Richer UI

- I used an existing ui component library here in order to create an mvp type solution. Given more time this could be enhanced to present the data in a more impactful way.
