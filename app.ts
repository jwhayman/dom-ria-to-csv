import axios, {AxiosInstance} from "axios"
import {Property, PropertySearchParams} from "./types"
import {ExportToCsv} from "export-to-csv";
import * as fs from "fs";

require("axios-debug-log")
const config = require("./config.json")
const searchParams: PropertySearchParams = config.searchParams

class DomRia {
    private api: AxiosInstance;
    private properties: Array<any>;

    constructor() {
        this.api = axios.create({
            baseURL: "https://developers.ria.com/dom",
            params: {
                api_key: config.apiKey
            }
        })
        this.properties = []
    }

    async init() {
        try {
            const propertyIds = await this.searchProperties(searchParams)

            for (const propertyId of propertyIds) {
                this.properties.push(await this.getProperty(propertyId))
            }

            this.exportToCsv()
        } catch (e) {
            console.log(e.message)
        }
    }

    async searchProperties(params: PropertySearchParams) {
        const response = await this.api.get('/search', {
            params: params
        })
        return response.data?.items
    }

    async getProperty(propertyId: number) {
        const response = await this.api.get(`/info/${propertyId}`)
        return response.data as Property
    }

    exportToCsv() {
        let csvData = []
        for (const property of this.properties) {
            if (property.latitude && property.longitude) {
                csvData.push({
                    id: property.realty_id,
                    url: property.beautiful_url,
                    description: property.description,
                    street_name: property.street_name,
                    latitude: property.latitude,
                    longitude: property.longitude,
                })
            } else {
                console.log(`No location data for ${property.id}`)
            }
        }

        const date = new Date()
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        }

        const csvExporter = new ExportToCsv(options)
        const csv = csvExporter.generateCsv(csvData, true)
        fs.writeFileSync(`DOM Ria Export ${date.getTime()}.csv`, csv)
    }
}

const domRia = new DomRia().init()