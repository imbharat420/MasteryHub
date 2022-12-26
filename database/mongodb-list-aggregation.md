
**List of all aggregation pipeline**

Here is a list of the most commonly used aggregation pipeline operators in MongoDB:

1.  $match: Filters the documents to pass through the pipeline.
2.  $project: Reshapes the documents in the pipeline by specifying the fields to include or exclude, as well as the transformations to be applied to the data.
3.  $group: Groups the documents by a specific field or set of fields, and can be used to perform operations such as calculating totals or averages over the grouped data.
4.  $sort: Sorts the documents by a specific field or set of fields.
5.  $limit: Limits the number of documents passed to the next stage in the pipeline.
6.  $skip: Skips a specified number of documents before passing the remaining documents to the next stage in the pipeline.
7.  $unwind: Deconstructs an array field from the input documents to output a document for each element.
8.  $lookup: Performs a left outer join on a collection in the same database and adds a new array field to the input documents containing the matching documents from the "from" collection.
9.  $addFields: Adds new fields to the input documents, or replaces the value of existing fields with new values.
10.  $replaceRoot: Replaces the input documents with the specified document.
11.  $out: Writes the results of the aggregation pipeline to a new collection.

Note that these are just a few of the operators available in the MongoDB aggregation framework. There are many more available for specific use cases, such as aggregating geospatial data or working with dates and times. You can find more information about the complete set of aggregation operators in the MongoDB documentation.