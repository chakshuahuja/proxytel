## ProxyTel
Create Proxy Masked Phone connections for your business easily with no coding.

ProxyTel allows you to quickly integrate masked phone numbers very easily in your app. All you have to do is come and register your app, after which:

1. You are given a URL: Simply send a REST request on the url `/connection/start/<yourCustomerPhoneNumber>/<yourDriverPhoneNumber>/<orderID>`

2. That's it, we will give you two virtualPhone numbers: one you can give to your customer and other to your driver. And they can easily contact each other.

3. Once this transaction is complete simply send another request to stop: 
`/connection/stop/<yourCustomerPhoneNumber><yourDriverPhoneNumber>/<orderID>` 

4. Here `orderID` can be any sort of reference number to distinguish one business transaction.

5. What's more? You don't have to manage any phone number! We will do that balancing, based on your traffic.

6. Still want more? Well, we will transcribe all the customer-driver phone recordings to text and send all to IBM-Watson for sentimental analysis for any harsh conversations which will be flagged to you to take further action.

7. Here, driver can be any other kind of agent. For example, in case of showing homes, it can be the realtor. In apps which connect buyers and sellers (like CraigList), the agent can be the seller.
