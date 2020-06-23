import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';

import { CartService } from '../../services/cart.service';
import { environment } from '../../../environments/environment';

const sqId: string = environment.sqId;
declare var SqPaymentForm : any; //Variable magica para que funcione el form de square
var sqnonce: string; //Variable magica para guardar el token de square
var err: string = "";

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.page.html',
  styleUrls: ['./payment-modal.page.scss'],
})

export class PaymentModalPage implements OnInit {

  @Input() nombre: string;
  paymentForm: any; //this is our payment form object
  msj: string;
  
  constructor( private modalCtrl: ModalController,
               public cartService: CartService,
               private loadingCtrl: LoadingController) { }

  ngOnInit() {
    
    //objeto proporcionado en el tutorial de square
    this.paymentForm = new SqPaymentForm({
      
      // Initialize the payment form elements
      applicationId: sqId,
      inputClass: 'sq-input',
      autoBuild: false,

      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [{
          fontSize: '16px',
          lineHeight: '24px',
          padding: '16px',
          placeholderColor: '#a0a0a0',
          backgroundColor: '#f4f5f8',
      }],

      // Initialize the credit card placeholders
      cardNumber: {
          elementId: 'sq-card-number',
          placeholder: 'Card Number'
      },
      cvv: {
          elementId: 'sq-cvv',
          placeholder: 'CVV'
      },
      expirationDate: {
          elementId: 'sq-expiration-date',
          placeholder: 'MM/YY'
      },
      postalCode: {
          elementId: 'sq-postal-code',
          placeholder: 'Postal'
      },

      // SqPaymentForm callback functions
      callbacks: {
          /*
          * callback function: cardNonceResponseReceived
          * Triggered when: SqPaymentForm completes a card nonce request
          */
          cardNonceResponseReceived: function (errors, nonce, cardData) {
          if (errors) {
              // Log errors from nonce generation to the browser developer console.
              console.error('Encountered errors:');
              errors.forEach(function (error) {
      
                  console.error('  ' + error.message);
                  err = error.message;

              });
              console.log('Encountered errors, check browser developer console for more details');
              return;
          }
            sqnonce = nonce;
            //aqui normalmente hace el llamado al backend 
            //pero en este caso solo guardamos el token y se hace la llamada en el servicio cartService
            }
          }
    });

    this.paymentForm.build();
  }

  //Sale de la pagina sin hacer nada
  salirSinPagar(){
    this.modalCtrl.dismiss();
  }
  
  //Solicita el token SqPaymentForm y luego el pago en a cartservice
  async onGetCardNonce(event) {
    // Don't submit the form until SqPaymentForm returns with a nonce 
    // Probablemente no aplica en este caso pero lo dejo por si acaso
    event.preventDefault();

    // Request a nonce from the SqPaymentForm object
    await this.paymentForm.requestCardNonce();

    //Send the payment to the backend
    if(await this.presentLoading()){
      this.msj = err;
      if(this.msj == ""){
        console.log("entro")
        await this.cartService.sqPayCall(sqnonce);
        this.modalCtrl.dismiss({nombre: 'paolin'});
      }
    }
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    return true;
  }

}
