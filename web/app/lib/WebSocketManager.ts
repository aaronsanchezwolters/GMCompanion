import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

type SignalRListener = (method: string, payload: any) => void;

class SignalRManager {
  public connection: HubConnection | null = null;

  async connect(url: string) {
    if (this.connection) return;

    this.connection = new HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .build();

    this.connection.onclose(() => {
      console.log('SignalR disconnected');
      this.connection = null;
    });

    this.connection.onreconnecting(() => {
      console.log('SignalR reconnecting...');
    });

    this.connection.onreconnected(() => {
      console.log('SignalR reconnected');
    });

    await this.connection.start();
    console.log('SignalR connected');
  }

  send(method: string, payload: any) {
    if (this.connection) {        
      this.connection.send(method, payload);
    }
  }
}

export const signalRManager = new SignalRManager();