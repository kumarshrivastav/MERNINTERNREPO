import React from 'react'
import {Table} from "flowbite-react"
const TableRowField = ({transaction}) => {
  
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>{transaction.id}</Table.Cell>
        <Table.Cell className='font-serif font-semibold'>{transaction.title}</Table.Cell>
        <Table.Cell className='line-clamp-2 font-serif'>{transaction.description}</Table.Cell>
        <Table.Cell className='font-serif'>{Number(transaction.price).toFixed(2)}</Table.Cell>
        <Table.Cell className='font-serif'>{transaction.category}</Table.Cell>
        <Table.Cell className={`font-serif ${transaction.sold ? 'text-red-600':'text-green-600'}`}>{transaction.sold ? "Sold":"Not Sold"}</Table.Cell>
        <Table.Cell><img src={transaction.image} className='flex items-center justify-center overflow-hidden h-16 w-24 rounded-full '/></Table.Cell>
    </Table.Row>
  )
}

export default TableRowField
