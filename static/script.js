document.addEventListener('DOMContentLoaded', () => {

    const storedData = JSON.parse(localStorage.getItem('meterReadingData')) || [];
    const keys = Object.keys(storedData);
    keys.sort();

    document.getElementById('detailsBackButton').addEventListener('click', () => {
        document.getElementById('detailsSlideArea').style.right = '-100%';
    });

    document.getElementById('detailsBtn').addEventListener('click', () => {
        document.getElementById('detailsSlideArea').style.right = '0';
    });

    document.getElementById('backArea').addEventListener('click', () => {
        document.getElementById('detailsSlideArea').style.right = '-100%';
    });

    const lastMonthReadingInput = document.getElementById('lastMonthReading');
    const meterReadingInput = document.getElementById('meterReading');
    const perUnitCostInput = document.getElementById('perUnitCost');
    const waterCostInput = document.getElementById('waterCost');
    const advanceInput = document.getElementById('advance');
    const submitBtn = document.getElementById('submitBtn');
    const submitSound = document.getElementById('submitSound');

    const lastKey = keys[keys.length - 1];
    const lastEntry = storedData[lastKey];
    if (lastEntry) {
        lastMonthReadingInput.value = lastEntry.meterReading;
    }
    waterCostInput.value = "100";

    

    submitBtn.addEventListener('click', () => {
        const lastMonthReading = parseFloat(lastMonthReadingInput.value);
        const meterReading = parseFloat(meterReadingInput.value);
        const waterCost = parseFloat(waterCostInput.value);
        const advance = parseFloat(advanceInput.value);

        if (isNaN(lastMonthReading) || isNaN(meterReading) || isNaN(waterCost) || isNaN(advance)) {
            alert('Please enter valid numbers');
            return;
        }

        const inputContainer = document.getElementById('inputContainer');
        const resultContainer = document.getElementById('resultContainer');
        const date = document.getElementById('date');
        const thisMonth = document.getElementById('thisMonth');
        const lastMonth = document.getElementById('lastMonth');
        const unitConsumed = document.getElementById('unitConsumed');
        const money = document.getElementById('money');
        const waterCostDis = document.getElementById('waterCostDis');
        const tMoney = document.getElementById('tMoney');
        const advanceDis = document.getElementById('advanceDis');
        const gtMoney = document.getElementById('gtMoney');

        inputContainer.style.display = 'none';
        resultContainer.style.display = 'block';

        date.textContent = new Date().toLocaleDateString();
        thisMonth.textContent = meterReading;
        lastMonth.textContent = lastMonthReading;
        unitConsumed.textContent = meterReading - lastMonthReading;
        money.textContent = (meterReading - lastMonthReading) * 0.6;
        waterCostDis.textContent = waterCost;
        tMoney.textContent = (meterReading - lastMonthReading) * 0.6 + waterCost;
        advanceDis.textContent = advance;
        gtMoney.textContent = (meterReading - lastMonthReading) * 0.6 + waterCost + advance;

        resultContainer.classList.remove('hidden');
        lastMonthReadingInput.value = '';
        meterReadingInput.value = '';
        waterCostInput.value = '';
        advanceInput.value = '';
        submitSound.play();
    });

})