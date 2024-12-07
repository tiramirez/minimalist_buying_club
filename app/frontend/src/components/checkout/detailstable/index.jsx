import React from "react";
import { NumericFormat } from 'react-number-format';

export function OrderDetailsTable(props) {
    const { orderDetails } = props

    return (
        <div>
            <table className="w-full text-left border-collapse">
                <tbody>
                    {orderDetails.map((item) =>
                        <tr>
                            <td className="border-b md:py-1 px-1 md:px-4 font-semibold">
                                {item.label}
                            </td>
                            <td className="border-b md:py-1 px-1 md:px-4 text-right">
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