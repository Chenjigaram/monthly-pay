import { Component } from '@angular/core';
import { AmplifyService }  from 'aws-amplify-angular';
import { Interactions } from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'monthly-pay';
  amplifyService:any;
  signedIn:any;
  user:any;
  greeting:any;
  
  constructor( public amplify:AmplifyService ) {
      
    this.amplifyService = amplify;
    
    /** now you can access category APIs:
     *
     * this.amplifyService.auth();          // AWS Amplify Auth
     * this.amplifyService.analytics();     // AWS Amplify Analytics
     * this.amplifyService.storage();       // AWS Amplify Storage
     * this.amplifyService.api();           // AWS Amplify API
     * this.amplifyService.cache();         // AWS Amplify Cache
     * this.amplifyService.pubsub();        // AWS Amplify PubSub
     * this.amplifyService.interactions();  // AWS Amplify Interactions
     *     
    **/
   this.amplifyService.authStateChange$
   .subscribe(authState => {
       this.signedIn = authState.state === 'signedIn';
       if (!authState.user) {
           this.user = null;
       } else {
           this.user = authState.user;
           this.greeting = "Hello " + this.user.username;
       }
   });
  }
  onImagePicked( file ) {

    let key = `pics/${file.name}`;
    
    this.amplify.storage().put( key, file, {
      'level': 'private',
      'contentType': file.type
    })
    .then (result => console.log('uploaded: ', result))
    .catch(err => console.log('upload error: ', err));
  
}
onAlbumImageSelected( event ) {
  window.open( event, '_blank' );
}

}
