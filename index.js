const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data;
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container')
    // clear data
    phoneContainer.innerText = ''
    // condition-display show button
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // display 12 phones
    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }
    phones.forEach(phone => {
        // console.log(phone)
        // crate a div
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card py-4 bg-gray-100 shadow-xl`

        // set inner html
        phoneCard.innerHTML = `
        <figure>
        <img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">
                            ${phone.phone_name}
                            <div class="badge badge-secondary">NEW</div>
                        </h2>
                        <p>There is the new launched phone is here</p>
                        <div class="card-actions justify-center">
                        <button onclick="handleShowDetails('${phone.slug}')"
                        class="btn btn-primary">Show Details</button>
                        </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    })

    // hide loading spinner
    handleLoading(false);
}

// 
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data;
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone)
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img class='mx-auto my-0' src="${phone.image}" alt="" />
    <p><span>Brand:</span>${phone?.brand}</p>
    <p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>Display size:</span>${phone?.mainFeatures?.displaySize}</p>
    <p><span>Chip set:</span>${phone?.mainFeatures?.chipSet}</p>
    <p><span>Memory:</span>${phone?.mainFeatures?.memory}</p>
    <p><span>GPS:</span>${phone?.other?.GPS || 'No GPS'}</p>
    <p><span>Slug:</span>${phone?.slug}</p>
    <p><span>Release Date:</span>${phone?.releaseDate}</p>
    `
    // show the modal
    show_details_modal.showModal()

}

// handle search button
const handleSearch = (isShowAll) => {
    handleLoading(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText)
    loadPhone(searchText, isShowAll)
}
const handleLoading = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    // loadingSpinner.classList.remove('hidden')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}

// handle show all
const handleShowAll = () => {
    handleSearch(true)
}
