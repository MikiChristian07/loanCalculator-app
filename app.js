// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
        // Hide results
        document.getElementById('results').style.display = 'none';
    
        // Show Loader
        document.getElementById('loading').style.display = 'block';
    
        setTimeout(calculateResults, 2000)

        e.preventDefault();
});

// Calculate Results
function calculateResults(){
    console.log('Calculating...');

    // UI Vars
    const amountUI = document.getElementById('amount');
    const interestUI = document.getElementById('interest');
    const yearsUI = document.getElementById('years');
    const monthlyPaymentUI = document.getElementById('monthly-payment');
    const totalPaymentUI = document.getElementById('total-payment');
    const totalInterestUI = document.getElementById('total-interest');


    const principal = parseFloat(amountUI.value);
    const calculatedInterest = parseFloat(interestUI.value) / (100 / 12);
    const calculatedPayements = parseFloat(yearsUI.value) * 12;

    // Compute montly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayements);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPaymentUI.value = monthly.toFixed(2);
        totalPaymentUI.value = (monthly * calculatedPayements).toFixed(2);
        totalInterestUI.value = ((monthly * calculatedPayements) - principal).toFixed(2);

        // Show Results
        document.getElementById('results').style.display = 'block';

        // Hide Loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');

        // Hide Loader
        document.getElementById('loading').style.display = 'none';
    }
    
    
}

// Show Error
function showError(error){
    // Create a div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Remove error after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);


}