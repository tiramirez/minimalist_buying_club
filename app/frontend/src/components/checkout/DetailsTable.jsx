import React from "react";
import { NumericFormat } from 'react-number-format';

export function OrderDetailsTable(props) {
    const { orderDetails } = props

    return (
        <div className="pb-4">
            <table className="w-full text-left border-collapse">
                <tbody>
                    {orderDetails.map((item) =>
                        <tr key={item.label}>
                            <td className="border-b md:py-1 font-semibold">
                                {item.label}
                            </td>
                            <td className="border-b md:py-1 text-right">
                                <NumericFormat
                                    value={item.value.toFixed(2)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}