// @flow

import * as React from 'react';
import {
  DragSource,
} from 'react-dnd';
import { BOARD } from './DragAndDropTypes';
import DragList from '../../components/commons/DragList';
import type { Category } from '../../types/index';
import type {
  DragSourceConnector,
  DragSourceMonitor,
  ConnectDragSource
} from 'react-dnd';

type DndProps = {
  connectDragSource: ConnectDragSource,
  isDragging: boolean
};

type Props = {
  category: Category
} & DndProps;

const DragCategories = ({
  connectDragSource,
  isDragging,
  category
}: Props): React.Node => {
  return (
    <div>
      {connectDragSource(
        <div>
          <DragList element={category} isDragging={isDragging} />
        </div>
      )}
    </div>
  );
};

const cardSource = {
  beginDrag({
    category
  }: {
    category: Category
  }): {
    id: string,
    name: string,
    type: string
  } {
    return {
      id: category.id,
      name: category.name,
      type: 'category'
    };
  }
};

function collect(
  connect: DragSourceConnector,
  monitor: DragSourceMonitor
): DndProps {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export default (DragSource(BOARD, cardSource, collect): DragSource<{},
DndProps>)(DragCategories);
