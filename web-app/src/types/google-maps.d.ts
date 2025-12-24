declare namespace google.maps {
    namespace places {
        class Autocomplete {
            constructor(input: HTMLInputElement, opts?: AutocompleteOptions);
            addListener(eventName: string, handler: () => void): any;
            getPlace(): PlaceResult;
        }

        interface AutocompleteOptions {
            types?: string[];
            componentRestrictions?: { country: string | string[] };
        }

        interface PlaceResult {
            geometry?: {
                location: {
                    lat(): number;
                    lng(): number;
                };
            };
            formatted_address?: string;
            name?: string;
        }
    }

    namespace event {
        function removeListener(listener: any): void;
    }
}
