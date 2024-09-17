'use client'

import { useState } from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'

export default function AddressForm(){
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [addressData, setAddressData] = useState({
        phone: '',
        country: '',
        state: '',
        city: '',
        street: '',
        houseNo: '',
        postalCode: '',
        defaultAddress: false
    })

    const handleOnChange = (e) => {
        setAddressData({
            ...addressData,
            [e.target.name]: e.target.value
        })
    }

    const handleCountryChange = (val) => {
        setCountry(val);
        setRegion('');
        setAddressData({
            ...addressData,
            country: val
        });
    };

    // Handle region/state change
    const handleRegionChange = (val) => {
        setRegion(val);
        setAddressData({
            ...addressData,
            state: val
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(addressData)
    }

    const handleCancel = ()=> {
        console.log('cancelled')
    }

    return(
        <form className="add-address" onSubmit={handleSubmit}>
            <h2 className="heading">Add a new address</h2>
            <div className="container">
                <div className="form-control">
                    <label htmlFor="phone">Mobile Number</label>
                    <PhoneInput
                        country={'us'}
                        value={addressData.phone}
                        onChange={(value)=> setAddressData({...addressData, phone: value})}
                        inputProps={{
                            type: 'tel',
                            name: 'phone',
                            required: true,
                            className: 'phone'
                        }}
                        isValid={(value, country) => {
                            if (value.match(/12345/)) {
                                return 'Invalid value: '+value+', '+country.name;
                            } else if (value.match(/1234/)) {
                                return false;
                            } else {
                                return true;
                            }
                        }}
                    />
                </div>
                <div className="form-control">
                    <label>Country</label>
                    <CountryDropdown
                        value={country}
                        onChange={(val) => handleCountryChange(val)}
                        defaultOptionLabel="Select a country"
                    />
                </div>
                <div className="form-control">
                    <label>State/Region</label>
                    <RegionDropdown
                        country={country}
                        value={region}
                        onChange={(val) => handleRegionChange(val)}
                        defaultOptionLabel="Select a state/region"
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="city">City</label>
                    <input 
                        type="text" 
                        name="city" 
                        className='city' 
                        value={addressData.city} 
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="street">Street</label>
                    <input 
                        type="text" 
                        name="street"
                        className='street'
                        value={addressData.street}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="flat, house no, building, company, apartment">Flat, House no., Building, Company, Apartment</label>
                    <input 
                        type="number" 
                        name="houseNo"
                        className='house-no'
                        value={addressData.houseNo}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="postalcode">Postal Code</label>
                    <input 
                        type="text" 
                        name="postalCode"
                        className='postalcode'
                        value={addressData.postalCode}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-control checkbox-container">
                    <input 
                        type="checkbox" 
                        name="default" 
                        checked={addressData.defaultAddress}
                        onChange={(e) => setAddressData({...addressData, defaultAddress: e.target.checked})}
                        className="checkbox" 
                    />
                    <label htmlFor="default">Use as my default address</label>
                </div>
                <div className="form-control btn-container">
                    <button 
                        className='cancel-btn'
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button type="submit">Add New Address</button>
                </div>
            </div>
        </form>
    )
}
