import { 
	Component, 
	OnInit 
} 					from '@angular/core';
import { Apollo } 	from 'apollo-angular';


import gql 			from 'graphql-tag';
import { Subject } 	from 'rxjs/Subject';


// We use the gql tag to parse our query string into a query document
const CurrentUserForProfile = gql`
	query CurrentUserForProfile($avatarSize: Int!) {
		currentUser {
			login
			avatar_url(avatarSize: $avatarSize)
		}
	}
`;


interface QueryResponse{
	currentUser: any
	loading: any
}


@Component({ 
	selector: 'profile-component',
	template: ``,
})
export class ProfileComponent implements OnInit {
	

	loading: boolean;
	currentUser: any;
	avatarSize: Subject<number> = new Subject<number>();


	constructor(
		private apollo: Apollo,
		private data: any
	) {}


	ngOnInit() {

		this.apollo
			.watchQuery<QueryResponse>({
				query: CurrentUserForProfile
			})
			.subscribe(({data}) => {
				this.loading = data.loading;
				this.currentUser = data.currentUser;
			})
		;

		this.data = this.apollo
			.watchQuery({
				query: CurrentUserForProfile,
				variables: {
					avatarSize: 100
				}
			})
		;

		// nothing happens
		// watchQuery waits for the first emitted value
		setTimeout(
			() => {
				// query runs
				this.displayBig();
			}, 
			1000
		);

	}


	displayBig() {
		this.avatarSize.next(300);
	}


	displaySmall() {
		this.avatarSize.next(50);
	}



}





