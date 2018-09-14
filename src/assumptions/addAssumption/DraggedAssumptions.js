// @flow

import * as React from 'react';
import { DragSource } from 'react-dnd';
import { BOARD } from './DragAndDropTypes';
import DragList from '../../components/commons/DragList';
import type { AssumptionType } from '../../types/index';
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
  assumptionType: AssumptionType
} & DndProps;

const DraggedAssumptions = ({
  connectDragSource,
  isDragging,
  assumptionType
}: Props): React.Node => {
  return (
    <div>
      {connectDragSource(
        <div>
          <DragList element={assumptionType} isDragging={isDragging} />
        </div>
      )}
    </div>
  );
};

const cardSource = {
  beginDrag({
    assumptionType
  }: {
    assumptionType: AssumptionType
  }): {
    id: string,
    name: string,
    type: string
  } {
    return {
      id: assumptionType.id,
      name: assumptionType.name,
      type: 'assumptionType'
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
  DndProps>)(DraggedAssumptions);
