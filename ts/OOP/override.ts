namespace Override_feature {
  /**
   * Check the tsconfig file
   * "noImplicitOverride": true
   */

  class A {
    doSomething(x: string) {
      console.log(`arg was ${x}`);
    }
  }

  class B extends A {
    override doSomething(x: string): void {
      console.log("some stuff ");
    }
  }

  // --------------------------------- Not intentional override

  class Dispose {
    isDisposed = false;

    log(msg: string) {
      console.log(msg);
    }

    dispose() {
      this.isDisposed = true;
      this.log("disposed");
    }
  }

  class File extends Dispose {
    /*
    log(msg: string): void {
      console.log(msg);
    }
    // This will show a compile-time error
    */

    // Instead we use an other name , we don't mean to inherite the log function
    write(content: string) {
      // write to file ...
    }
  }
}
