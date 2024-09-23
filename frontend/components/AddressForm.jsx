'use client'

import { useState } from 'react'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useUX } from '@/utils/context/ux/uxContext';
import { useProfile } from '@/utils/context/profile/profileContext';

export default function AddressForm(){
    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const { data: session } = useSession()
    const { dispatch: uxDispatch } = useUX()
    const { state: profileState, dispatch: profileDispatch } = useProfile()

    // Set default state for address form data
    const initialAddressData = {
        phone: '',
        country: '',
        state: '',
        city: '',
        street: '',
        houseNo: '',
        postalCode: '',
        defaultAddress: false
    }

    const [addressData, setAddressData] = useState(initialAddressData)

    const handleOnChange = (e) => {
        setAddressData({
            ...addressData,
            [e.target.name]: e.target.value
        })
    }

    const handlePhoneChange = (value, country) => {
        // Safeguard if country.name is undefined
        const countryName = country?.name || '';
        setCountry(countryName)
        setRegion('')
        setAddressData({
            ...addressData,
            phone: value,
            country: countryName
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

    const handleRegionChange = (val) => {
        setRegion(val);
        setAddressData({
            ...addressData,
            state: val
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Ensure all required fields are filled
            if(!addressData.phone || !addressData.country || !addressData.state || !addressData.city || !addressData.street || !addressData.houseNo || !addressData.postalCode){
                throw new Error('Please fill all fields')
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/addresses/add`,
                { addressData },
                { headers: {'Authorization': `Bearer ${session.accessToken}`} }
            )
            
            if(response.data){
                profileDispatch({type: 'UPDATE_PROFILE', payload: response.data})
                setAddressData(initialAddressData) // Reset the form
            }

        } catch (error) {
            console.error(error)
            // Add UI feedback for errors (Optional)
        }
    }

    const handleCancel = () => {
        uxDispatch({type: 'TOGGLE_MODAL'})
    }

    return (
        <form className="add-address" onSubmit={handleSubmit} id='address-form'>
            <h2 className="heading">Add a new address</h2>
            <div className="container">
                <div className="form-control">
                    <label htmlFor="phone">Mobile Number</label>
                    <PhoneInput
                        country={'us'}
                        value={addressData.phone}
                        onChange={(value, country)=> handlePhoneChange(value, country)}
                        inputProps={{
                            type: 'tel',
                            name: 'phone',
                            required: true,
                            className: 'phone'
                        }}
                    />
                </div>
                <div className="form-control">
                    <label>Country</label>
                    <CountryDropdown
                        value={country}
                        onChange={handleCountryChange}
                        defaultOptionLabel="Select a country"
                    />
                </div>
                <div className="form-control">
                    <label>State/Region</label>
                    <RegionDropdown
                        country={country}
                        value={region}
                        onChange={handleRegionChange}
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
                    <label htmlFor="houseNo">Flat, House no., Building, Company, Apartment</label>
                    <input 
                        type="number" 
                        name="houseNo"
                        className='house-no'
                        value={addressData.houseNo}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="postalCode">Postal Code</label>
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
                        name="defaultAddress" 
                        checked={addressData.defaultAddress}
                        onChange={(e) => setAddressData({...addressData, defaultAddress: e.target.checked})}
                        className="checkbox" 
                    />
                    <label htmlFor="default">Use as my default address</label>
                </div>
                <div className="form-control btn-container">
                    <button 
                        type='button'
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
