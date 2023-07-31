const { request, response } = require('express')
const Sheet = require('../models/data/sheet')

const getSheets = (req = request, res = response) => {
  try {
    const { skip = 0, limit = 5 } = req.query
    const sheet = new Sheet()
    const data = sheet.sheetAll()
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
const getSheet = () => {}
const createSheet = () => {}
const updateSheet = () => {}
const deleteSheet = () => {}

module.exports = { getSheets, getSheet, createSheet, updateSheet, deleteSheet }
