(() => ({
  name: 'planner',
  type: 'CONTENT_COMPONENT',
  icon: 'TitleIcon',
  orientation: 'HORIZONTAL',
  allowedTypes: [],
  jsx: (() => {
    const users = [
      {
        id: 1,
        name: 'Alice',
        events: [
          { id: 'e1', name: 'Kickoff Meeting', startDate: '2024-10-01', endDate: '2024-10-01' },
          { id: 'e2', name: 'Weekly Standup', startDate: '2024-10-05', endDate: '2024-10-05' },
        ],
      },
      {
        id: 2,
        name: 'Bob',
        events: [
          { id: 'e3', name: 'Project Review', startDate: '2024-10-03', endDate: '2024-10-03' },
        ],
      },
      {
        id: 3,
        name: 'Charlie',
        events: [
          { id: 'e4', name: 'Kickoff Meeting', startDate: '2024-10-01', endDate: '2024-10-01' },
          { id: 'e5', name: 'Code Review', startDate: '2024-10-07', endDate: '2024-10-07' },
        ],
      },
      {
        id: 4,
        name: 'Diana',
        events: [
          { id: 'e6', name: 'Sprint Planning', startDate: '2024-10-06', endDate: '2024-10-06' },
          { id: 'e7', name: 'Kickoff Meeting', startDate: '2024-10-01', endDate: '2024-10-01' },
        ],
      },
      {
        id: 5,
        name: 'Eve',
        events: [
          { id: 'e8', name: 'Client Demo', startDate: '2024-10-10', endDate: '2024-10-10' },
          { id: 'e9', name: 'Code Review', startDate: '2024-10-07', endDate: '2024-10-07' },
        ],
      },
      {
        id: 6,
        name: 'Frank',
        events: [
          { id: 'e10', name: 'Project Review', startDate: '2024-10-03', endDate: '2024-10-03' },
          { id: 'e11', name: 'Weekly Standup', startDate: '2024-10-05', endDate: '2024-10-05' },
        ],
      },
      {
        id: 7,
        name: 'Grace',
        events: [
          { id: 'e12', name: 'Sprint Planning', startDate: '2024-10-06', endDate: '2024-10-06' },
          { id: 'e13', name: 'Client Demo', startDate: '2024-10-10', endDate: '2024-10-10' },
        ],
      },
    ];
    
    const colors = [
      '#FF5733',
      '#FF8C00',
      '#FFD700',
      '#32CD32',
      '#4682B4',
      '#6A5ACD',
      '#FF1493',
      '#FF69B4',
      '#FF4500',
      '#1E90FF',
      '#8B008B',
      '#00CED1',
      '#FF6347',
      '#8B0000',
      '#2E8B57',
    ];
    
    const getDaysInMonth = (year, month) => {
      return new Array(31 - new Date(year, month, 32).getDate())
        .fill('')
        .map((_, index) => index + 1);
    };
    
    const legenda = (users) => {
      let index = 0;
      const uniqueEvents = [];
      users.forEach(user => {
        user.events.forEach(event => {
          if (!uniqueEvents.some(item => item.title === event.name)) {
            const colored = colors[index % colors.length];
            index++;
            uniqueEvents.push({
              title: event.name, 
              color: colored
            });
          }
        });
      });
      return uniqueEvents;
    };
    
    const legend = legenda(users);
    const convertEvents = (users) => {
      return users.flatMap(user =>
        user.events.map((event) => {
          const colorlegenda = legend.find(item => item.title === event.name);
          return {
            id: event.id,
            title: event.name,
            start: new Date(event.startDate),
            end: new Date(event.endDate),
            resource: user.name,
            color: colorlegenda ? colorlegenda.color : 'grey', 
          };
        })
      );
    };
    
    const events = convertEvents(users);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);

    return (
      <div className={classes.calendarContainer}>
        <div className={classes.topwrapper}>
          <select className={classes.select}>
            <option>{currentYear}</option>
          </select>
          <select className={classes.select}>
            <option>{currentMonth}</option>
          </select>
          <div className={classes.legend}>
            <ul className={classes.legendUl}>
              {legend.map((event) => (
                <li key={event.title}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: '10px',
                      height: '10px',
                      backgroundColor: event.color,
                      borderRadius: '50%',
                      marginRight: '8px',
                    }}
                  />
                  <span className={classes.span1}>{event.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <table className={classes.calendarTable}>
          <thead>
            <tr className={classes.tableRow}>
              <th className={classes.tableHeader}>Name</th>
              {daysInMonth.map((day) => (
                <th key={day} className={classes.tableHeader}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.name} className={classes.tableRow}>
                <td className={classes.nameCell}>{user.name}</td>
                {daysInMonth.map((day) => {
                  const event = events.filter(event => new Date(event.start).getDate() === day && event.resource === user.name);
                  return (
                    <td key={day} className={classes.tableCell} style={event.length > 0 ? {
                      backgroundColor: event[0].color,  
                      cursor: 'pointer',
                    } : {}}>
                      {event.length > 0 ? (
                        <div className={classes.eventLabel}>
                          {event.map(Event => (
                            <div key={Event.id}></div>
                          ))}
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  })(),
  
  styles: B => t => {
    const style = new B.Styling(t);
    return {
      calendarContainer: {
        overflowX: 'hidden',
        maxWidth: '100vw',
        fontFamily: 'Arial, sans-serif',
      },
      calendarTable: {
        width: '100%',
        tableLayout: 'fixed',  
      },
      tableHeader: {
        whiteSpace: 'nowrap',
        textAlign: 'center',
        padding: '12px',
        backgroundColor: '#f4f4f4',
        fontSize: '14px',
        borderBottom: '2px solid #ddd',
      },
      span1: {
        marginRight: "8px"
      },
      select: {
        fontSize: '14px',
        color: '#333',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ccc',
        borderRadius: '4px',
      },
      tableRow: {
        maxWidth: '100vw',
        borderBottom: '2px solid #ddd',
      },
      topwrapper: {
        display: 'flex',
        alignItems: 'center',
        margin: '10px',
        gap: '10px',
        width: '100vw',            
      },
      tableCell: {
        padding: '8px',
        textAlign: 'center',
        minWidth: '40px',          
        maxWidth: '80px',          
        overflow: 'hidden',        
        border: '1px solid #ddd',
      },
      nameCell: {
        padding: '8px',
        textAlign: 'center',
        overflow: 'hidden',        
        border: '1px solid #ddd',
        whiteSpace: 'nowrap',
        minWidth: '100px'
      },
      hasEvent: {
        backgroundColor: '#ffe8e8',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      },
      eventLabel: {
        backgroundColor: 'inherit',
        color: '#fff',
        padding: '4px',
        borderRadius: '4px',
        fontSize: '12px',
        textAlign: 'center',
      },
      legendUl: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    };
  },
}))();
