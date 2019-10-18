/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Label, Row, Col, FormControl, Modal, OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { t } from '@superset-ui/translation';
import { getChartMetadataRegistry } from '@superset-ui/chart';

import ControlHeader from '../ControlHeader';
import './VizTypeControl.css';
import { convertKeysToCamelCase } from '@superset-ui/core';

const propTypes = {
  description: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
};

const defaultProps = {
  onChange: () => {},
};
var a = null;
setTimeout(()=>{
  a = {b:1};
},2000);





const registry = getChartMetadataRegistry();
const chartMetadataCn={
  "Line Chart":"折线图",
"Big Number with Trendline":"有趋势线的大数字",
"Table":"表格",
"Filter Box":"过滤箱",
"Bar Chart":"条形图",
"Area Chart":"面积图",
"Time-series Bar Chart":"时间序列条形图",
"deck.gl Polygon":"deck.gl多边形",
"Pie Chart":"饼图",
"Time-series Table":"时间序列表",
"Pivot Table":"数据透视表",
"Histogram":"直方图",
"Big Number":"大数字",
"deck.gl Scatterplot":"deck.gl散点图",
"deck.gl 3D Hexagon":"deck.gl三维六边形",
"Time-series Period Pivot":"时间序列周期轴",
"deck.gl Arc":"desk.gl弧形",
"Heatmap":"热图",
"deck.gl Grid":"desk.gl网格",
"Dual Line Chart":"双线图",
"deck.gl Screen Grid":"deck.gl屏幕网格",
"Multiple Line Charts":"多折线图",
"Treemap":"矩阵树图",
"Box Plot":"方块图",
"Markup":"标记",
"Sunburst Chart":"太阳爆发图",
"Sankey Diagram":"桑基图",
"Word Cloud":"文字云",
"MapBox":"地图框",
"Calendar Heatmap":"日历热图",
"Nightingale Rose Chart":"夜莺玫瑰图",
"Bubble Chart":"气泡图",
"deck.gl Geojson":"deck.gl geojson文件",
"Horizon Chart":"地平线图",
"deck.gl Multiple Layers":"deck.gl多层",
"Time-series Percent Change":"时间序列百分比变化",
"Partition Chart":"分区图",
"Event Flow":"事件流",
"deck.gl Path":"deck.gl路径",
"Force-directed Graph":"力有向图",
"World Map":"世界地图",
"Paired t-test Table":"配对t检验表",
"Parallel Coordinates":"平行坐标",
"IFrame":"内嵌框架",
"Country Map":"国家地图",
"Bullet Chart":"项目符号图表",
"Chord Diagram":"和弦图",

};

const IMAGE_PER_ROW = 6;
const LABEL_STYLE = { cursor: 'pointer' };
const DEFAULT_ORDER = [
  'line', 'big_number', 'table', 'filter_box', 'dist_bar', 'area', 'bar',
  'deck_polygon', 'pie', 'time_table', 'pivot_table', 'histogram',
  'big_number_total', 'deck_scatter', 'deck_hex', 'time_pivot', 'deck_arc',
  'heatmap', 'deck_grid', 'dual_line', 'deck_screengrid', 'line_multi',
  'treemap', 'box_plot', 'separator', 'sunburst', 'sankey', 'word_cloud',
  'mapbox', 'kepler', 'cal_heatmap', 'rose', 'bubble', 'deck_geojson',
  'horizon', 'markup', 'deck_multi', 'compare', 'partition', 'event_flow',
  'deck_path', 'directed_force', 'world_map', 'paired_ttest', 'para',
  'iframe', 'country_map',
];

const typesWithDefaultOrder = new Set(DEFAULT_ORDER);

export default class VizTypeControl extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      filter: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.setSearchRef = this.setSearchRef.bind(this);
    this.focusSearch = this.focusSearch.bind(this);
  }

  onChange(vizType) {
    this.props.onChange(vizType);
    this.setState({ showModal: false });
  }

  setSearchRef(searchRef) {
    this.searchRef = searchRef;
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  changeSearch(event) {
    this.setState({ filter: event.target.value });
  }

  focusSearch() {
    if (this.searchRef) {
      this.searchRef.focus();
    }
  }

  renderItem(entry) {
    const { value } = this.props;
    const { key, value: type } = entry;
    const isSelected = key === value;

    return (
      <div
        className={`viztype-selector-container ${isSelected ? 'selected' : ''}`}
        onClick={this.onChange.bind(this, key)}
      >
        <img
          alt={type.name}
          width="100%"
          className={`viztype-selector ${isSelected ? 'selected' : ''}`}
          src={type.thumbnail}
        />
        <div className="viztype-label">
          {type.name}
        </div>
      </div>);
  }

  render() {
    const { filter, showModal } = this.state;
    const { value } = this.props;

    const filterString = filter.toLowerCase();
    let filteredTypes = DEFAULT_ORDER
      .filter(type => registry.has(type))
      .map(type => ({
        key: type,
        value: registry.get(type),
      }))
      .concat(registry.entries().filter(({ key }) => !typesWithDefaultOrder.has(key)))
      .filter(entry => entry.value.name.toLowerCase().includes(filterString));

    for(var item in filteredTypes){
      const name= filteredTypes[item].value.name;
      // console.log(name);
      if(chartMetadataCn[name])
        filteredTypes[item].value.name=chartMetadataCn[name];
    }



    const rows = [];
    for (let i = 0; i <= filteredTypes.length; i += IMAGE_PER_ROW) {
      rows.push(
        <Row key={`row-${i}`}>
          {filteredTypes.slice(i, i + IMAGE_PER_ROW).map(entry => (
            <Col md={12 / IMAGE_PER_ROW} key={`grid-col-${entry.key}`}>
              {this.renderItem(entry)}
            </Col>
          ))}
        </Row>);
    }

    return (
      <div>
        <ControlHeader {...this.props} />
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip id="error-tooltip">{t('Click to change visualization type')}</Tooltip>
          }
        >
          <React.Fragment>
            <Label onClick={this.toggleModal} style={LABEL_STYLE}>
              {registry.has(value) ? registry.get(value).name : `${value}`}
            </Label>
            {(!registry.has(value) && <div className="text-danger">
              <i className="fa fa-exclamation-circle text-danger" /> <small>{t('This visualization type is not supported.')}</small>
            </div>)}
          </React.Fragment>
        </OverlayTrigger>
        <Modal
          show={showModal}
          onHide={this.toggleModal}
          onEnter={this.focusSearch}
          onExit={this.setSearchRef}
          bsSize="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>{t('选择显示类型')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="viztype-control-search-box">
              <FormControl
                inputRef={this.setSearchRef}
                type="text"
                value={filter}
                placeholder={t('搜索')}
                onChange={this.changeSearch}
              />
            </div>
            {rows}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

VizTypeControl.propTypes = propTypes;
VizTypeControl.defaultProps = defaultProps;
