import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 220px;
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    background-color: white;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')};
    transition: background-color 0.2s ease;
    flex-grow: 1;
    min-height: 100px;
`;

class InnerList extends React.Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.tasks === this.props.tasks) {
            return false;
        }
        return true;
    }
    render() {
        return this.props.tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
        ));
    }
}

export default class Column extends React.Component {
    render() {
        return (
            <Draggable
                draggableId={this.props.column.id}
                index={this.props.index}
            >
                {provided => (
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <Title {...provided.dragHandleProps}>
                            {this.props.column.title}
                        </Title>
                        <Droppable
                            droppableId={this.props.column.id}
                            // type={this.props.column.id === 'column-3' ? 'done' : 'active'}
                            isDropDisabled={this.props.isDropDisabled}
                            // direction='horizontal'
                            type="task"
                        >
                            {(provided, snapshot) => (
                                <TaskList
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    <InnerList tasks={this.props.tasks} />
                                    {provided.placeholder}
                                </TaskList>
                            )}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        )
    }
};