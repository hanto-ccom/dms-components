import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
// directory.service.spec.ts
import { TestBed } from '@angular/core/testing';

import {
    DirectoryEntry,
    DirectoryService,
} from './dms-directory.service';

describe('DirectoryService', () => {
    let service: DirectoryService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DirectoryService]
        });
        service = TestBed.inject(DirectoryService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    it('should fetch and map entries correctly', () => {
        const mockResponse = {
            entries: [
                { properties: { id: '123', label: 'Alice' } },
                { id: '456', label: 'Bob' },
                { absoluteLabel: 'Charlie' }
            ]
        };

        const params = { directoryName: 'users', searchTerm: 'a' };

        service.suggestEntries(params).subscribe((results: DirectoryEntry[]) => {
            expect(results.length).toBe(3);
            expect(results[0]).toEqual({ id: '123', displayLabel: 'Alice', properties: { id: '123', label: 'Alice' } });
            expect(results[1]).toEqual(jasmine.objectContaining({ id: '456', displayLabel: 'Bob' }));
            expect(results[2].displayLabel).toBe('Charlie');
        });

        const req = httpMock.expectOne('/api/operation/Directory.SuggestEntries');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(params);
        req.flush(mockResponse);
    });

    it('should escape special characters in fallback id', () => {
        const raw = '<test>&"';
        const escaped = (service as any).escape(raw);
        expect(escaped).toBe('&lt;test&gt;&amp;&quot;');
    });
});