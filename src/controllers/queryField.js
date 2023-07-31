const { request, response } = require('express')
const QueryField = require('../models/data/queryField')

const getQueryFields = (req = request, res = response) => {
  try {
    const { skip = 0, limit = 5 } = req.query
    const queryField = new QueryField()
    const data = queryField.queryFieldAll()
    const objResponse = {
      success: true,
      message: 'Data found',
      data: {
        request: data,
        pagination: {
          current_page: 1,
          next_page: null,
          previous_page: null,
          total_pages: null,
          per_page: null,
          total_entries: null
        }
      }
    }
    res.status(200).json(objResponse)
  } catch (error) {
    const objResponse = {
      success: false,
      message: '',
      error_code: 1306,
      data: {},
      error
    }
    res.status(500).json(objResponse)
  }
}
const getQueryField = () => {}
const createQueryField = () => {}
const updateQueryField = () => {}
const deleteQueryField = () => {}

module.exports = { getQueryFields, getQueryField, createQueryField, updateQueryField, deleteQueryField }
