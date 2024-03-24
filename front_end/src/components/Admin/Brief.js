import '../../styled/Admin.css';

function Brief() {
  return(
    <div className='jyh-table'>
      <p className='jyh-tb-title'>일자별 주문 요약(주문 승인건)</p>
      <table className='jyh-brief-table'>
        <thead>
          <tr>
            <th>일자</th>
            <th>주문수</th>
            <th>매출액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-03-15</td>
            <td>1</td>
            <td>20000</td>
          </tr>
          <tr>
            <td>2024-03-15</td>
            <td>1</td>
            <td>20000</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Brief