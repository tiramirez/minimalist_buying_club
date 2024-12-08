import React, { useEffect, useState, useMemo } from "react";

export function UsersInfoForm(props) {
    const {customerInfo, updatecustomerInfo, showMissingInfo} = props

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    function handleEmailChange(event) {
        if (event.target?.value && event.target.value.match(isValidEmail)) {
        console.log('VALID EMAIL')
        updatecustomerInfo({ ...customerInfo, email: event.target.value, validEmail: true })
        } else {
        console.log('EMAIL NOT VALID')
        updatecustomerInfo({ ...customerInfo, validEmail: false })
        }
    }

    const isValidPhone = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/g;
    function handlePhoneChange(event) {
        if (event.target?.value && event.target.value.match(isValidPhone)) {
        updatecustomerInfo({ ...customerInfo, phone: event.target.value, validPhone: true })
        console.log('VALID PHONE')
        } else {
        updatecustomerInfo({ ...customerInfo, validPhone: false })
        console.log('PHONE NOT VALID')
        }
    }
    
    return (
        <>
            <table className="w-full mb-6">
                <tbody>
                    <tr>
                        <td className="md:py-1 font-semibold text-sm md:text-base">First Name:</td>
                        <td>
                            <textarea onChange={(e) => e.target?.value && updatecustomerInfo({ ...customerInfo, firstName: e.target.value })} rows="1" required className="w-full px-1 py-3/4 border border-gray-300 rounded" />
                        </td>
                    </tr>
                    <tr>
                        <td className="md:py-1 font-semibold text-sm md:text-base">Last Name:</td>
                        <td>
                            <textarea onChange={(e) => e.target?.value && updatecustomerInfo({ ...customerInfo, lastName: e.target.value })} rows="1" required className="w-full px-1 py-3/4 border border-gray-300 rounded"></textarea>
                        </td>
                    </tr>
                    {!customerInfo.validEmail && showMissingInfo ? <tr><td></td><td><p className="font-bold text-red-500">!! Missing or Invalid Email</p></td></tr> : <tr><td></td></tr>}
                    <tr>
                        <td className="md:py-1 font-semibold text-sm md:text-base">Email:</td>
                        <td>
                            <textarea onChange={handleEmailChange} type="text" placeholder="your@email.com" rows="1" required className="w-full px-1 py-3/4 border border-gray-300 rounded"></textarea>
                        </td>
                    </tr>
                    {!customerInfo.validPhone && showMissingInfo ? <tr><td></td><td><p className="font-bold text-red-500">!! Missing or Invalid Phone</p></td></tr> : <tr><td></td></tr>}
                    <tr>
                        <td className="md:py-1 font-semibold text-sm md:text-base">Phone:</td>
                        <td>
                            <textarea onChange={handlePhoneChange} type="number" placeholder="(123)4567890" rows="1" required className="w-full px-1 py-3/4 border border-gray-300 rounded"></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}