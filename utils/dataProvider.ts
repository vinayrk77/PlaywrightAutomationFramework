import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

export class DataProvider{

static getDataFromJson(filepath: string) {
    const fileData = fs.readFileSync(filepath, { encoding: 'utf8' });
    const data = JSON.parse(fileData);
    return data;
}

static getDataFromCsv(filepath: string)
{
    let data: any = parse(fs.readFileSync(filepath), {columns:true,skip_empty_lines:true});
    return data;
}
}