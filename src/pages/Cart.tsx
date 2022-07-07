export function Cart() {
    return (
        <main className="wrapper">
            <table>
                <tr>
                    <th></th>
                    <th>PRODUTO</th>
                    <th>QTD</th>
                    <th>SUBTOTAL</th>
                </tr>
                {
                    [0, 1, 2].map(item => (
                        <li></li>
                    ))
                }
            </table>
        </main>
    )
}