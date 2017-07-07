import { 
	Component, 
	OnInit 
} 							from '@angular/core';
import { 
	Apollo, 
	ApolloQueryObservable 
} 							from 'apollo-angular';
import gql 					from 'graphql-tag';





const FeedQuery = gql`
	query Feed {
		currentUser {
			login
		}
		feed(type: HOT) {
			createdAt
			score
		}
	}
`;



@Component({
	selector: 'feed',
	template: `
		<ul *ngFor="let entry of data | async | select: 'feed'">
			Score: {{entry.score}}
		</ul>
	`
})
export class FeedComponent implements OnInit {
	data: ApolloQueryObservable<any>;

	constructor(
		private apollo: Apollo,
		//private data: ApolloQueryObservable<any>
	) {}

	ngOnInit() {
//		this.data = this.apollo.watchQuery({ query: FeedQuery });
	}
}




