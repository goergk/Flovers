import React from 'react';
import classes from '../Stats.module.css';
import InfoIcon from '@mui/icons-material/Info';

interface Props {
    soldProductsTab: number[] | undefined,
    desc: string,
    reducer: (accumulator: number, curr: number) => number,
    period: string | null,
    time_period: string[],
    AverageOfSoldFlowers: () => number,
    income: number,
    AverageOfIncomes: () => number,
}

const InfoBox: React.FC<Props> = ({
    soldProductsTab,
    desc,
    reducer,
    period,
    time_period,
    AverageOfSoldFlowers,
    income,
    AverageOfIncomes
}) => {
    return (
        <div className={classes.Info_Container}>
            <div className={classes.Single_Info_Container}>
                <div className={classes.Icon_Container}>
                    <InfoIcon className={classes.Info_Icon} />
                </div>
                <div className={classes.Text_Container}>
                    {
                        soldProductsTab?.length!
                            ?
                            <p>Sum of the {desc.includes('flowers') ? 'flowers' : 'bouquets'} sold in the last {period ? period : '7 days'}:
                                <b style={{ color: 'rgb(235, 235, 235)' }}>
                                    &nbsp;
                                    {soldProductsTab?.reduce(reducer)}
                                </b>.
                            </p>
                            :
                            <p>Select flower or bouquet to see information about it.</p>
                    }
                </div>
            </div>
            {
                soldProductsTab?.length!
                    ?
                    <>
                        <div className={classes.Single_Info_Container}>
                            <div className={classes.Icon_Container}>
                                <InfoIcon className={classes.Info_Icon} />
                            </div>
                            <div className={classes.Text_Container}>
                                {
                                    soldProductsTab?.length!
                                        ?
                                        <p>Average sales per {period !== time_period[2] || !period ? 'day' : 'month'} in the last {period ? period : '7 days'}:
                                            <b style={{ color: 'rgb(235, 235, 235)' }}>
                                                &nbsp;
                                                {AverageOfSoldFlowers().toFixed(2)}
                                            </b>.
                                        </p>
                                        :
                                        <p>Select flower or bouquet to see information about it.</p>
                                }
                            </div>
                        </div>
                        <div className={classes.Single_Info_Container}>
                            <div className={classes.Icon_Container}>
                                <InfoIcon className={classes.Info_Icon} />
                            </div>
                            <div className={classes.Text_Container}>
                                {
                                    soldProductsTab?.length!
                                        ?
                                        <p>Total revenue for {desc.includes('flowers') ? 'flower' : 'bouquet'} sales over the last {period ? period : '7 days'}:
                                            <b style={{ color: 'rgb(235, 235, 235)' }}>
                                                &nbsp;
                                                {income.toFixed(2)}
                                                $
                                            </b>.
                                        </p>
                                        :
                                        <p>Select flower or bouquet to see information about it.</p>
                                }
                            </div>
                        </div>
                        <div className={classes.Single_Info_Container}>
                            <div className={classes.Icon_Container}>
                                <InfoIcon className={classes.Info_Icon} />
                            </div>
                            <div className={classes.Text_Container}>
                                {
                                    soldProductsTab?.length!
                                        ?
                                        <p>Average sales per {period !== time_period[2] || !period ? 'day' : 'month'} in the last {period ? period : '7 days'}:
                                            <b style={{ color: 'rgb(235, 235, 235)' }}>
                                                &nbsp;
                                                {AverageOfIncomes().toFixed(2)}
                                                $
                                            </b>.
                                        </p>
                                        :
                                        <p>Select flower or bouquet to see information about it.</p>
                                }
                            </div>
                        </div>
                    </>
                    :
                    <p></p>
            }
        </div>
    )
}

export default InfoBox