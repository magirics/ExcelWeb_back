const { response } = require("express");
const CommandQueryDao = require("../models/data/commandQuery");
const QueryDao = require("../models/data/query");
const SheetDao = require("../models/data/sheet");
const QueryFieldDao = require("../models/data/queryField");
const PlainDao = require("../models/data/plain");

function parseDatabaseData(data) {
  const header = Object.keys(data)
  const cells = data.map((row, ri) => {
    return Object.values(row).map((column, ci) => {
      return {c: ci, r: ri, v: {
        // ct: {fa: 'General', t: 'g or n'},
        m: column,
        v: column
      }}
    })
  })
  return cells
}

const projectQuery = (req = request, res = response) => {
  try {
    const { id } = req.params;
    const sheet = new SheetDao()
    const resGetSheetsByProjectID = sheet.getSheetByProject(id)
    if (resGetSheetsByProjectID.length <= 0) {
      const objResponse = {
        success: true,
        message: 'Data Obtenida',
        data: [{
          name: 'Hoja 1',
          index: 0,
          data: [],
      }],
      }
      res.status(200).json(objResponse);
      return
    }

    const arrData = resGetSheetsByProjectID.map((sheet) => {
      if ((!sheet.IS_QUERY && !sheet.IS_PLAIN)) {
        return {
              name: 'Hoja 1',
              index: 0,
              data: [],
          }
      }
      const { ID_QUERY, ID_PLAIN } = sheet

      if (!!ID_QUERY) {
        const query = new QueryDao()
        const { SENTENCE } = query.queryGetOne(ID_QUERY)
        if (!SENTENCE) throw new Error('No hay sentencia')

        const commandQuery = new CommandQueryDao()
        const data = commandQuery.execQuery(SENTENCE);

        const queryField = new QueryFieldDao()
        const resQueryField = queryField.queryFieldGetOne(ID_QUERY) // It returns more than 1
        const fieldsName = resQueryField.filter(field => field.IS_ACTIVE).map(field => field.FIELD_NAME)

        return {
          id_sheet: sheet.ID_SHEET,
          
          is_query: sheet.IS_QUERY,
          is_plain: sheet.IS_PLAIN,
          id_query: sheet.ID_QUERY,
          id_plain: sheet.ID_PLAIN,

          name: sheet.TITLE,
          index: sheet.NIVEL,
          data: parseDatabaseData(data),
        }
      } else if (!!ID_PLAIN) {
        const plain = new PlainDao()
        
        console.log('ID_PLAIN =>', ID_PLAIN);
        const resPlain = plain.plainGetOne(ID_PLAIN)
        console.log('resPlain =>', resPlain);
        const { FULL_TEXT } = resPlain
        return {
          id_sheet: sheet.ID_SHEET,

          id_plain: sheet.ID_PLAIN,
          id_query: sheet.ID_QUERY,
          is_plain: sheet.IS_PLAIN,
          is_query: sheet.IS_QUERY,

          name: sheet.TITLE,
          index: sheet.NIVEL,
          celldata: JSON.parse(FULL_TEXT),
        }
      }

    });

    const objResponse = {
      success: true,
      message: 'Data Obtenida',
      data: arrData,
    }
    res.status(200).json(objResponse);
  } catch (error) {
    const objResponse = {
      success: false,
      message: error.message,
      error_code: 1306,
      data: {},
      error,
    }
    res.status(200).json(objResponse);
  }
}



module.exports = { projectQuery }
