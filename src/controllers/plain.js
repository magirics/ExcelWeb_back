const { request, response } = require('express')
const Plain = require('../models/data/plain')

const getPlains = (req = request, res = response) => {
  try {
    const { skip = 0, limit = 5 } = req.query
    const plain = new Plain()
    const data = plain.plainAll()
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
const getPlain = () => {}
const createPlain = () => {}
const updatePlain = () => {}
const deletePlain = () => {}

module.exports = { getPlains, getPlain, createPlain, updatePlain, deletePlain }
