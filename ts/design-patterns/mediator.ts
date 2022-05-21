namespace Mediator {
	class Mediator {
		constructor(public members: Set<Member>) {}

		add(member: Member) {
			this.members.add(member);

			member.mediator = this;
		}

		send(msg: string, from: Member, to: Member) {
			to.receive(msg, from);
		}
	}

	class Member {
		constructor(public name: string, public mediator?: Mediator) {}

		send(message: string, to: Member) {
			if (!this.mediator) return;
			this.mediator.send(message, this, to); // here where the role of mediator comes
		}

		receive(message: string, from: Member) {
			console.log(`Message from ${from.name}; ${message}`);
		}
	}
}
