document.addEventListener('DOMContentLoaded', () => {

    const storedData = JSON.parse(localStorage.getItem('meterReadingData')) || [];
    const keys = Object.keys(storedData);
    keys.sort();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/static/service-worker.js')
            .then((reg) => console.log('Service Worker registered', reg))
            .catch((err) => console.error('Service Worker registration failed', err));
    } else {
        console.warn('Service Worker not supported in this browser.');
    }

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
        perUnitCostInput.value = lastEntry.perUnitCost;
 waterCostInput.value = lastEntry.waterCost || ''; // Handle cases where waterCost might be missing
    }    

    submitBtn.addEventListener('click', () => {
        const lastMonthReading = parseFloat(lastMonthReadingInput.value);
        const meterReading = parseFloat(meterReadingInput.value);
        const perUnitCost = parseFloat(perUnitCostInput.value);
        const waterCost = parseFloat(waterCostInput.value);
        const advance = parseFloat(advanceInput.value);

 if (isNaN(lastMonthReading) || isNaN(meterReading) || isNaN(perUnitCost) || isNaN(waterCost) || isNaN(advance)) {
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
 money.textContent = ((meterReading - lastMonthReading) * perUnitCost).toFixed(2); // Format to 2 decimal places
        waterCostDis.textContent = waterCost;
 tMoney.textContent = ((meterReading - lastMonthReading) * perUnitCost + waterCost).toFixed(2); // Format to 2 decimal places
        advanceDis.textContent = advance;
        gtMoney.textContent = (meterReading - lastMonthReading) * perUnitCost + waterCost + advance;

 const newData = {
            ...storedData,
            [monthKey]: {
                date: new Date().toLocaleDateString(),
                meterReading: meterReading,
                lastMeterReading: lastMonthReading,
                perUnitCost: perUnitCost,
                waterCost: waterCost,
                unit_consumed: meterReading - lastMonthReading,
                money: ((meterReading - lastMonthReading) * perUnitCost).toFixed(2),
                watercost: waterCost,
                tmoney: ((meterReading - lastMonthReading) * perUnitCost + waterCost).toFixed(2),
                advance: advance,
                gt_money: ((meterReading - lastMonthReading) * perUnitCost + waterCost + advance).toFixed(2)
            }
        };

 localStorage.setItem('meterReadingData', JSON.stringify(newData));

        lastMonthReadingInput.value = '';
        meterReadingInput.value = '';
        waterCostInput.value = '';
        advanceInput.value = '';
        submitSound.play();
    });

})