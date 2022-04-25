import * as React from 'react';
import { BaseWebComponent, IDataFilterInfo, IDataFilterValueInfo, ExtensibilityConstants, FilterConditionOperator } from '@pnp/modern-search-extensibility';
import * as ReactDOM from 'react-dom';
import { TextField, ChoiceGroup, IChoiceGroupOption, ITheme, Text } from 'office-ui-fabric-react';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { state } from 'lit-element';
import { debounce } from '@microsoft/sp-lodash-subset';

export interface IFilterTextBoxComponentProps {

    /**
     * If the checkbox should be disabled
     */
    disabled?: boolean;

    /**
     * The count for this filter value
     */
    count?: number;

    /**
     * The filter value to display
     */
    name?: string;

    /**
     * The value to use when selected
     */
    value?: string;

    /**
     * The filter name where belong the value
     */
    filterName?: string;

    /**
     * The Web Part instance ID from where the filter component belongs
     */
    instanceId?: string;

    /**
     * Indicate if the filter is configured as multi values
     */
    isMulti?: boolean;

    /**
     * The current theme settings
     */
    themeVariant?: IReadonlyTheme;

    /**
     * Handler when a filter value is selected
     */
    onChanged: (filterName: string, filterValue: IDataFilterValueInfo) => void;
}

export interface IFilterTextBoxComponentState {
    searchValue: string;
}

export class FilterTextBoxWebComponent extends BaseWebComponent {

    public constructor(props: IFilterTextBoxComponentProps) {
        super();
    }

    public async connectedCallback() {
        let props = this.resolveAttributes();
        console.log("props inside connectedCallback", props);

        const textBox = (
            <TextField                styles={{
                    root: {
                        position: 'relative',
                        display: 'flex',
                        paddingRight: 10,
                        paddingLeft: 10,
                        paddingBottom: 7,
                        paddingTop: 7
                    }
                }}
                // value={this.props.value}

                onChange={(evt, value) => {
                    console.log("before debounce!", value);
                    const filterValue: IDataFilterValueInfo = {
                        name: props.filterName,
                        value: value,
                        selected: value != null
                    };

                    this.dispatchEvent(new CustomEvent(ExtensibilityConstants.EVENT_FILTER_UPDATED,
                        {
                            detail: {
                                filterName: props.filterName,
                                filterValues: [filterValue],
                                instanceId: props.instanceId
                            } as IDataFilterInfo,
                            bubbles: true,
                            cancelable: true
                        }
                    ));
                }
                }

            />




        );

        ReactDOM.render(textBox, this);
    }
}