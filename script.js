document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

function makePayment() {
    const paymentData = {
        buttonName: "Bolero Ramirez",
        address: "bitcoincash:qrcnfcfcfvde9hwyvlmlqux2grdn5yp4lqx2lmlxtl",
        currency: "BCH",
        amount: 5,
        opReturn: "Felicidades!"
    };

    // Redirect to a payment URL or open a wallet app
    const paymentUrl = `https://paybutton.org/button/9af2aa22-9650-11ef-ad5b-023202f034e5?address=${encodeURIComponent(paymentData.address)}&amount=${paymentData.amount}&currency=${paymentData.currency}&opReturn=${encodeURIComponent(paymentData.opReturn)}`;
    
    // Open payment URL in a new tab or window
    window.open(paymentUrl, '_blank');
}

