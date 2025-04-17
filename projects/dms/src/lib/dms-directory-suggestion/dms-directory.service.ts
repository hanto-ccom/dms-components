import { HttpClient } from '@angular/common/http';
// directory.service.ts
import { Injectable } from '@angular/core';

import {
    map,
    Observable,
} from 'rxjs';

export interface DirectoryEntry {
    id: string;
    displayLabel: string;
    [key: string]: any;
}

interface DirectoryResponse {
    entries: any[];
}

@Injectable({ providedIn: 'root' })
export class DirectoryService {
    constructor(private http: HttpClient) { }

    suggestEntries(params: Record<string, any>): Observable<DirectoryEntry[]> {
        // adjust the URL to your actual endpoint
        return this.http
            .post<DirectoryResponse>('/api/operation/Directory.SuggestEntries', params)
            .pipe(
                map((res) =>
                    (res.entries || []).map((e) => ({
                        id:
                            e.properties?.id ??
                            e.id ??
                            this.escape(`${e}`),
                        displayLabel:
                            e.properties?.label ??
                            e.label ??
                            e.absoluteLabel ??
                            e.displayLabel ??
                            `${e}`,
                        ...e,
                    }))
                )
            );
    }

    private escape(str: string): string {
        return str.replace(/[&<>"'\/\\]/g, (s) =>
            ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#47;', '\\': '&#92;' }[s]!)
        );
    }
}
