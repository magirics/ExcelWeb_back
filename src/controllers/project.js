const { request, response } = require('express')
const Project = require('../models/data/project')

const getProjects = (req = request, res = response) => {
  try {
    const { skip = 0, limit = 5 } = req.query
    const project = new Project()
    const data = project.projectAll()
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
const getProject = () => {}
const createProject = () => {}
const updateProject = () => {}
const deleteProject = () => {}

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject }
