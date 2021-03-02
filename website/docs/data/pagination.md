---
title: Pagination
---

Sometimes, you will have one or more views in your application where you need to display a list that contains too much data to be either fetched or displayed at once. Pagination is the most common solution to this problem, and Apollo Client has built-in functionality that makes it quite easy to do.

There are basically two ways of fetching paginated data: numbered pages, and cursors. There are also two ways for displaying paginated data: discrete pages, and infinite scrolling. For a more in-depth explanation of the difference and when you might want to use one vs. the other, we recommend that you read our blog post on the subject: [Understanding Pagination](https://blog.apollographql.com/understanding-pagination-rest-graphql-and-relay-b10f835549e7).

In this article, we'll cover the technical details of using Apollo to implement both approaches.


## Using `fetchMore`

Apollo lets you do pagination with a method called [`fetchMore`](../caching/interaction.md#incremental-loading-fetchmore). You need to specify what query and variables to use for the update, and how to merge the new query result with the existing data on the client. How exactly you do that will determine what kind of pagination you are implementing.

## Offset-based

Offset based pagination - also called numbered pages - is a very common pattern, found on many websites, because it is usually the easiest to implement on the backend. In SQL for example, numbered pages can easily be generated by using [OFFSET and LIMIT](https://www.postgresql.org/docs/8.2/static/queries-limit.html).

Here is an example with numbered pages taken from [GitHunt](https://github.com/apollographql/githunt-angular):

```typescript
import { Apollo, QueryRef, gql } from 'apollo-angular';

const feedQuery = gql`
  query Feed($type: FeedType!, $offset: Int, $limit: Int) {
    currentUser {
      login
    }
    feed(type: $type, offset: $offset, limit: $limit) {
      id
      # ...
    }
  }
`;

@Component({ ... })
class FeedComponent implements OnInit {
  apollo: Apollo;
  feedQuery: QueryRef<any>;
  feed: any[];
  type: string;
  itemsPerPage: number = 10;

  ngOnInit() {
    this.feedQuery = this.apollo.watchQuery<any>({
      query: feedQuery,
      variables: {
        type: this.type,
        offset: 0,
        limit: this.itemsPerPage,
      },
      fetchPolicy: 'network-only',
    });

    this.feed = this.feedQuery
      .valueChanges
      .subscribe(({data}) => {
        this.feed = data.feed;
      });
  }

  fetchMore() {
    this.feedQuery.fetchMore({
      // query: ... (you can specify a different query. feedQuery is used by default)
      variables: {
        offset: this.feed.length,
      },
      // We are able to figure out which offset to use because it matches
      // the feed length, but we could also use state, or the previous
      // variables to calculate this (see the cursor example below)
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
        return Object.assign({}, prev, {
          feed: [...prev.feed, ...fetchMoreResult.feed],
        });
      },
    });
  }
}
```

As you can see, `fetchMore` is accessible through the `QueryRef` object.

In the example above, `fetchMore` is a function which calls `fetchMore` with the length of the current feed as a variable. Whenever you don't pass a query argument to `fetchMore`, fetch more will use the original `query` again with new variables. Once the new data is returned from the server, the `updateQuery` function is used to merge it with the existing data, which will cause a re-render of your UI component.

In the example above, the `fetchMore` function is called from the UI component:

```html
<loading *ngIf="loading"></loading>
<div *ngIf="!loading">
  <feed-entry
    *ngFor="let entry of feed"
    [entry]="entry"
    [currentUser]="currentUser"
    (onVote)="onVote($event)">
  </feed-entry>

  <a (click)="fetchMore()">Load more</a>

</div>
```

One downside of pagination with numbered pages or offsets is that an item can be skipped or returned twice when items are inserted into or removed from the list at the same time. That can be avoided with cursor-based pagination.

## Cursor-based

In cursor-based pagination a cursor is used to keep track of where in the data set the next items should be fetched from. Sometimes the cursor can be quite simple and just refer to the ID of the last object fetched, but in some cases - for example lists sorted according to some criteria - the cursor needs to encode the sorting criteria in addition to the ID of the last object fetched. Cursor-based pagination isn't all that different from offset-based pagination, but instead of using an absolute offset, it points to the last object fetched and contains information about the sort order used. Because it doesn't use an absolute offset, it is more suitable for frequently changing datasets than offset-based pagination.

In the example below, we use a `fetchMore` query to continuously load new comments, which then appear at the top. The cursor to be used in the `fetchMore` query is provided in the initial server response, and has to be updated whenever more data is fetched.

```typescript
const moreComments = gql`
  query moreComments($cursor: String) {
    moreComments(cursor: $cursor) {
      cursor
      comments {
        author
        text
      }
    }
  }
`;

class FeedComponent {
  feedQuery: QueryRef<any>;

  static cursor: any;

  // ...
  fetchMore() {
    this.feedQuery.fetchMore({
      query: moreComments,
      variables: {
        // cursor is the initial cursor returned by the original query
        // this.cursor is the cursor that we update via `updateQuery` below
        cursor: FeedComponent.cursor,
      },
      // We are able to figure out which offset to use because it matches
      // the feed length, but we could also use state, or the previous
      // variables to calculate this (see the cursor example below)
      updateQuery: (prev, { fetchMoreResult }) => {
        const previousEntry = previousResult.entry;
        const newComments = fetchMoreResult.comments.nextComments;

        // update internal reference to cursor
        FeedComponent.cursor = fetchMoreResult.cursor;

        return {
          title: previousEntry.title,
          author: previousEntry.author,
          // put promoted comments in front
          comments: [...newComments, ...previousEntry.comments],
        };
      },
    });
  }
  // ...
}
```